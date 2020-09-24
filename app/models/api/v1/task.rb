module Api
    module V1
        class Task < ApplicationRecord
            has_one :api_v1_sub_contracts,
                class_name: 'Api::V1::SubContract', 
                foreign_key: :api_v1_task_id, 
                dependent: :destroy
            belongs_to :api_v1_phase, 
                class_name: 'Api::V1::Phase', 
                foreign_key: :api_v1_phase_id
            has_one :api_v1_project, 
                class_name: 'Api::V1::Project', 
                :through => :api_v1_phase

            validates :title, presence: true
            validates :description, presence: true
            validates :budget, presence: true
            validates :start_date, presence: true
            validates :turnover_date, presence: true

            def to_json_with_sub_contract
                project = self.api_v1_project
                prime_contract = project.api_v1_prime_contracts
                if prime_contract
                    prime_contractor = prime_contract.api_v1_company
                end
                subcontract = self.api_v1_sub_contracts
                if subcontract 
                    sub_contractor = subcontract.api_v1_company
                end
                { id: self.id, title: self.title, description: self.description,
                budget: self.budget, start_date: self.start_date,
                turnover_date: self.turnover_date, is_done: self.is_done,
                api_v1_phase_id: self.api_v1_phase_id, sub_contractor: sub_contractor,
                subcontract: subcontract, project: project, prime_contractor: prime_contractor,
                updated: self.updated_at }
            end
        end
    end
end