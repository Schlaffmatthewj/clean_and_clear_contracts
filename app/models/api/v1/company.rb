module Api
    module V1
        class Company < ApplicationRecord
            has_secure_password

            has_many :api_v1_projects, 
                class_name: 'Api::V1::Project', 
                foreign_key: 
                :api_v1_company_id, 
                dependent: :destroy
            has_many :api_v1_prime_contracts, 
                class_name: 'Api::V1::PrimeContract', 
                foreign_key: 
                :api_v1_company_id, 
                dependent: :destroy
            has_many :api_v1_sub_contracts, 
                class_name: 'Api::V1::SubContract', 
                foreign_key: 
                :api_v1_company_id, 
                dependent: :destroy

            validates :name, presence: true, uniqueness: true 
            validates :address, presence: true, uniqueness: true
            validates :phone, presence: true, uniqueness: true, length: { maximum: 15 }
            validates :established_date, presence: true

            def to_json_with_contracts
                owned_projects = self.api_v1_projects
                if owned_projects.length > 0
                    owned_with_prime = owned_projects.map { |project|
                        phases = project.api_v1_phases
                        phase_cost = []
                        task_cost = []
                        if phases 
                            phases.map { |phase|
                                phase_cost.push(phase.budget)
                                tasks = phase.api_v1_tasks
                                if tasks 
                                    tasks.map { |task|
                                        task_cost.push(task.budget)
                                    }
                                end
                            }
                        end
                        total_cost = (phase_cost.sum + task_cost.sum)
                        prime_contract = Api::V1::PrimeContract.find_by api_v1_project_id: project[:id]
                        prime_contracts = []
                        prime_contracts.push(prime_contract)
                        project_profits = 0
                        if prime_contract
                            each_contract = prime_contracts.map { |contract|
                                project_profits = (project[:budget] - contract.amount)
                                prime_contractor = contract.api_v1_company
                                { id: contract[:id], amount: contract[:amount],
                                api_v1_company_id: contract[:api_v1_company_id],
                                api_v1_project_id: contract[:api_v1_project_id],
                                prime_contractor: prime_contractor
                                }
                            }
                        else
                            each_contract = []
                        end
                        budget_vs_cost = (project[:budget] - total_cost)
                        { api_v1_company_id: project[:api_v1_company_id], budget: project[:budget],
                            id: project[:id], is_done: project[:is_done], location: project[:location],
                            name: project[:name], owner: project[:owner], start_date: project[:start_date],
                            turnover_date: project[:turnover_date], prime_contract: each_contract,
                            total_cost: total_cost, project_profits: project_profits, budget_vs_cost: budget_vs_cost}
                    }
                else
                    owned_projects = []
                end
                sub_contracts = self.api_v1_sub_contracts
                if sub_contracts.length > 0
                    sub_tasks = sub_contracts.map { |contract|
                        task = contract.api_v1_task
                        phase = task.api_v1_phase
                        project = phase.api_v1_project
                        { id: contract[:id], amount: contract[:amount], project: project, task: task }
                    }
                else
                    sub_tasks = []
                end
                prime_contracts = self.api_v1_prime_contracts
                if prime_contracts.length > 0
                    prime_projects = prime_contracts.map { |contract|
                        project = contract.api_v1_project
                        phases = project.api_v1_phases
                        phase_cost = []
                        if phases 
                            task_cost = []
                            phases.map { |phase|
                                tasks = phase.api_v1_tasks
                                if tasks 
                                    tasks.map { |task|
                                        sub_contracts = task.api_v1_sub_contracts
                                        if sub_contracts
                                            task_cost.push(sub_contracts.amount)
                                        else
                                            task_cost.push(task.budget)
                                        end
                                    }
                                end
                                phase_profit = (phase.budget - task_cost.sum)
                                if phase_profit < 0
                                    phase_cost.push(task_cost.sum)
                                else
                                    phase_cost.push(phase.budget)
                                end
                            }
                        end
                        budget_vs_cost = (project.budget - phase_cost.sum)
                        prime_profits = (contract[:amount] - phase_cost.sum)

                        { id: contract[:id], amount: contract[:amount], project: project,
                        prime_profits: prime_profits, budget_vs_cost: budget_vs_cost, total_cost: phase_cost.sum}
                    }
                else
                    prime_projects = []
                end
                { id: self.id, name: self.name, address: self.address, phone: self.phone, 
                    established_date: self.established_date, is_owner: self.is_owner, is_prime: self.is_prime,
                    owned_projects: owned_with_prime, contracts: { prime_contracts: prime_projects,
                    sub_contracts: sub_tasks } }
            end
        end
    end
end