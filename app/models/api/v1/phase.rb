module Api
    module V1
        class Phase < ApplicationRecord
            has_many :api_v1_tasks, 
                class_name: 'Api::V1::Task', 
                foreign_key: :api_v1_phase_id, 
                dependent: :destroy
            belongs_to :api_v1_project, 
                class_name: 'Api::V1::Project'

            validates :title, presence: true
            validates :description, presence: true
            validates :budget, presence: true
            validates :start_date, presence: true
            validates :turnover_date, presence: true

            def to_json_with_tasks
                tasks = self.api_v1_tasks
                if tasks 
                    tasks_with_contract = tasks.map { |task|
                        subcontract = task.api_v1_sub_contracts
                        if subcontract
                            sub_contractor = subcontract.api_v1_company
                        end
                        { id: task.id, title: task.title, description: task.description,
                        budget: task.budget, start_date: task.start_date,
                        turnover_date: task.turnover_date, is_done: task.is_done,
                        api_v1_phase_id: task.api_v1_phase_id, sub_contractor: sub_contractor,
                        subcontract: subcontract }
                    }
                else
                    tasks_with_contract = []
                end
                { id: self.id, title: self.title, description: self.description,
                budget: self.budget, start_date: self.start_date, turnover_date: self.turnover_date, 
                is_done: self.is_done, tasks: tasks_with_contract, updated: self.updated_at }
            end

            def self.default_scope
                order(created_at: :desc)
            end
        end
    end
end