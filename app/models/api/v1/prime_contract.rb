module Api
    module V1
        class PrimeContract < ApplicationRecord
            belongs_to :api_v1_company, class_name: 'Api::V1::Company', foreign_key: :api_v1_company_id
            belongs_to :api_v1_project, class_name: 'Api::V1::Project', foreign_key: :api_v1_project_id

            validates :amount, presence: true

            def to_json_with_project_and_prime
                prime = self.api_v1_company
                project = self.api_v1_project
                { id: self.id, amount: self.amount, api_v1_company_id: api_v1_company_id, prime_contractor: prime, api_v1_project_id: api_v1_project_id, project: project }
            end
        end
    end
end