module Api
    module V1
        class PrimeContract < ApplicationRecord
            belongs_to :api_v1_company, 
                class_name: 'Api::V1::Company', 
                foreign_key: :api_v1_company_id
            belongs_to :api_v1_project, 
                class_name: 'Api::V1::Project', 
                foreign_key: :api_v1_project_id

            validates :amount, presence: true
        end
    end
end