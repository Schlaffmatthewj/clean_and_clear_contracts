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
                        prime_contract = Api::V1::PrimeContract.find_by api_v1_project_id: project[:id]
                        prime_contracts = []
                        prime_contracts.push(prime_contract)
                        if prime_contract
                            each_contract = prime_contracts.map { |contract|
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
                        { api_v1_company_id: project[:api_v1_company_id], budget: project[:budget],
                            id: project[:id], is_done: project[:is_done], location: project[:location],
                            name: project[:name], owner: project[:owner], start_date: project[:start_date],
                            turnover_date: project[:turnover_date], prime_contract: each_contract }
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
                        { id: contract[:id], amount: contract[:amount], project: project }
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