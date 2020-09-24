module Api
    module V1
        class PhasesController < ApplicationController
            before_action :set_api_v1_phase, only: [:show, :update, :destroy]
    
            def index
                phases = Api::V1::Phase.where api_v1_project_id: params[:project_id]
                if phases
                    phases_with_tasks = phases.map { |phase| phase.to_json_with_tasks }
                    render json: { message: 'All phases loaded successfully.', results: phases_with_tasks }
                else
                    render json: { message: 'All phases loaded successfully.', results: 0 }
                end
            end
        
            def show
                render json: { message: 'Phase loaded successfully.', results: @api_v1_phase.to_json_with_tasks }
            end
        
            def create
                @api_v1_phase = Api::V1::Phase.new api_v1_phase_params
                project_id = params[:project_id]
                @api_v1_phase[:api_v1_project_id] = project_id
        
                if @api_v1_phase.save
                    render json: { message: 'Phase was successfully created.', results: @api_v1_phase }
                else
                    render json: { message: 'Phase was NOT successfully created.', results: @api_v1_phase.errors }
                end
            end
        
            def update
                if @api_v1_phase.update api_v1_phase_params
                    render json: { message: 'Phase was successfully updated.', results: @api_v1_phase.to_json_with_tasks }
                else
                    render json: { message: 'Phase was NOT successfully updated.', results: @api_v1_phase.errors }
                end
            end
        
            def destroy
                @api_v1_phase.destroy
                render json: { message: 'Phase was successfully deleted.' }
            end
        
            private
        
            def set_api_v1_phase
                @api_v1_phase = Api::V1::Phase.find params[:id]
            end
        
            def api_v1_phase_params
                params.require(:api_v1_phase).permit(:title, :description, :budget, :start_date, :turnover_date, :is_done)
            end
        end
    end    
end