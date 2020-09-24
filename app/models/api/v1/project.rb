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
                if prime_contract
                    prime_contractor = prime_contract.api_v1_company
                end
                phases = self.api_v1_phases
                phases_with_tasks = phases.map { |phase|
                    tasks_method = phase.to_json_with_tasks
                    tasks = tasks_method[:tasks]
                    tasks_with_contracts = tasks.map { |task|
                        api_task = Api::V1::Task.find task[:id]
                        subcontracts = api_task.api_v1_sub_contracts
                        if subcontracts
                            sub_contractor = subcontracts.api_v1_company
                        end
                        { id: task[:id], title: task[:title], description: task[:description],
                        budget: task[:budget], start_date: task[:start_date],
                        turnover_date: task[:turnover_date], is_done: task[:is_done],
                        api_v1_phase_id: task[:api_v1_phase_id], sub_contractor: sub_contractor,
                        subcontracts: subcontracts, updated: task[:updated_at] }
                    }
                    { id: phase.id, title: phase.title, description: phase.description, 
                    budget: phase.budget, start_date: phase.start_date, 
                    turnover_date: phase.turnover_date, is_done: phase.is_done, 
                    api_v1_project_id: phase.api_v1_project_id, tasks: tasks_with_contracts,
                    updated: phase.updated_at }
                }
                { id: self.id, name: self.name, owner: self.owner, api_v1_company: self.api_v1_company,
                    location: self.location, budget: self.budget, start_date: self.start_date,
                    turnover_date: self.turnover_date, is_done: self.is_done, prime_contractor: prime_contractor,
                    prime_contract: prime_contract, phases: phases_with_tasks, updated: self.updated_at}
            end
        end
    end
end