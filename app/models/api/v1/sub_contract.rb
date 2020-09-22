module Api
    module V1
        class SubContract < ApplicationRecord
            belongs_to :api_v1_company, class_name: 'Api::V1::Company', foreign_key: :api_v1_company_id
            belongs_to :api_v1_task, class_name: 'Api::V1::Task', foreign_key: :api_v1_task_id

            validates :amount, presence: true

            def to_json_with_task_and_sub
                sub_contractor = self.api_v1_company
                task = self.api_v1_task
                { id: self.id, amount: self.amount, api_v1_company_id: api_v1_company_id, sub_contractor: sub_contractor, api_v1_task_id: api_v1_task_id, task: task }
            end
        end
    end
end