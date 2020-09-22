module Api
    module V1
        class Company < ApplicationRecord
            has_secure_password

            has_many :api_v1_prime_contracts, class_name: 'Api::V1::PrimeContract', foreign_key: :api_v1_company_id, dependent: :destroy
            has_many :api_v1_sub_contracts, class_name: 'Api::V1::SubContract', foreign_key: :api_v1_company_id, dependent: :destroy

            validates :name, presence: true, uniqueness: true 
            validates :address, presence: true, uniqueness: true
            validates :phone, presence: true, uniqueness: true, length: { maximum: 15 }
            validates :established_date, presence: true

            def to_json_with_contracts
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
                    established_date: self.established_date, is_prime: self.is_prime, 
                    contracts: { prime_contracts: prime_projects, sub_contracts: sub_tasks } }
            end
        end
    end
end