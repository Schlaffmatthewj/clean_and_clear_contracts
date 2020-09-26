module Api
    module V1
        class Project < ApplicationRecord
            belongs_to :api_v1_company, 
                class_name: 'Api::V1::Company'
            has_one :api_v1_prime_contracts,
                class_name: 'Api::V1::PrimeContract', 
                foreign_key: :api_v1_project_id, 
                dependent: :destroy
            has_many :api_v1_phases, 
                class_name: 'Api::V1::Phase', 
                foreign_key: :api_v1_project_id, 
                dependent: :destroy
            has_many :api_v1_tasks, 
                class_name: 'Api::V1::Task', 
                through: :api_v1_phases

            validates :name, presence: true, uniqueness: true
            validates :owner, presence: true
            validates :location, presence: true
            validates :budget, presence: true
            validates :start_date, presence: true
            validates :turnover_date, presence: true

            def to_json_with_phases_and_contracts
                prime_contract = self.api_v1_prime_contracts
                phases = self.api_v1_phases
                phase_cost = []
                phases_with_tasks = phases.map { |phase|
                    tasks_method = phase.to_json_with_tasks
                    tasks = tasks_method[:tasks]
                    tasks_cost = []
                    phase_profits = 0
                    tasks_with_contracts = tasks.map { |task|
                        api_task = Api::V1::Task.find task[:id]
                        subcontracts = api_task.api_v1_sub_contracts
                        task_profits = 0
                        if subcontracts
                            sub_contractor = subcontracts.api_v1_company
                            sub_amount = subcontracts.amount
                            task_profits = (task[:budget] - sub_amount)
                            if task_profits < 0
                                tasks_cost.push(sub_amount)
                            else
                                tasks_cost.push(task[:budget])
                            end
                            task_profits
                        else
                            tasks_cost.push(task[:budget])
                        end
                        phase_profits = (phase.budget - (tasks_cost.sum))
                        { id: task[:id], title: task[:title], description: task[:description],
                            budget: task[:budget], start_date: task[:start_date],
                            turnover_date: task[:turnover_date], is_done: task[:is_done],
                            api_v1_phase_id: task[:api_v1_phase_id], sub_contractor: sub_contractor,
                            subcontracts: subcontracts, updated: api_task.updated_at,
                            task_profits: task_profits}
                    }
                    if phase_profits < 0
                        phase_cost.push(tasks_cost.sum)
                    else
                        phase_cost.push(phase.budget)
                    end
                    { id: phase.id, title: phase.title, description: phase.description, 
                        budget: phase.budget, start_date: phase.start_date, 
                        turnover_date: phase.turnover_date, is_done: phase.is_done, 
                        api_v1_project_id: phase.api_v1_project_id, tasks: tasks_with_contracts,
                        updated: phase.updated_at, total_cost: tasks_cost.sum,
                        phase_profits: phase_profits }
                }
                project_profits = 0
                if prime_contract
                    prime_contractor = prime_contract.api_v1_company
                    prime_amount = prime_contract.amount
                    project_profits = (self.budget - (prime_amount))
                    prime_profits = (prime_amount - (phase_cost.sum))
                end
                budget_vs_cost = (self.budget - (phase_cost.sum))
                { id: self.id, name: self.name, owner: self.owner, api_v1_company: self.api_v1_company,
                    location: self.location, budget: self.budget, start_date: self.start_date,
                    turnover_date: self.turnover_date, is_done: self.is_done, prime_contractor: prime_contractor,
                    prime_contract: prime_contract, phases: phases_with_tasks, updated: self.updated_at,
                    total_cost: phase_cost.sum, project_profits: project_profits, prime_profits: prime_profits,
                    budget_vs_cost: budget_vs_cost }
            end
        end
    end
end