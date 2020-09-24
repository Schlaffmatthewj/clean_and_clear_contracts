module Api
    module V1
        class SubContract < ApplicationRecord
            belongs_to :api_v1_company, class_name: 'Api::V1::Company', foreign_key: :api_v1_company_id
            belongs_to :api_v1_task, class_name: 'Api::V1::Task', foreign_key: :api_v1_task_id

            validates :amount, presence: true
        end
    end
end