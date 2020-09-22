module Api
    module V1
        class TasksController < ApplicationController
            before_action :set_api_v1_task, only: [:show, :update, :destroy]
    
            def index
                tasks = Api::V1::Task.where api_v1_phase_id: params[:phase_id]
                if tasks
                    tasks_with_sub_contracts = tasks.map { |task| task.to_json_with_sub_contract }
                    render json: { message: 'All tasks loaded successfully.', results: tasks_with_sub_contracts }
                else
                    render json: { message: 'All tasks loaded successfully.', results: 0 }
                end
            end
        
            def show
                render json: { message: 'Task loaded successfully.', results: @api_v1_task.to_json_with_sub_contract }
            end
        
            def create
                @api_v1_task = Api::V1::Task.new api_v1_task_params
                phase_id = params[:phase_id]
                @api_v1_task[:api_v1_phase_id] = phase_id
        
                if @api_v1_task.save
                    render json: { message: 'Task was successfully created.', results: @api_v1_task }
                else
                    render json: { message: 'Task was NOT successfully created.', results: @api_v1_task.errors }
                end
            end
        
            def update
                if @api_v1_task.update api_v1_task_params
                    render json: { message: 'Task was successfully updated.', results: @api_v1_task }
                else
                    render json: { message: 'Task was NOT successfully updated.', results: @api_v1_task.errors }
                end
            end
        
            def destroy
                @api_v1_task.destroy
                render json: { message: 'Task was successfully deleted.' }
            end
        
            private
        
            def set_api_v1_task
                @api_v1_task = Api::V1::Task.find params[:id]
            end
        
            def api_v1_task_params
                params.require(:api_v1_task).permit(:title, :description, :budget, :start_date, :turnover_date, :is_done)
            end
        end
    end    
end