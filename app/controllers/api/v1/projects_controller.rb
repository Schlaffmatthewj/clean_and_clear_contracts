module Api
    module V1
        class ProjectsController < ApplicationController
            before_action :set_api_v1_project, only: [:show, :update, :destroy]
    
            def index
                projects = Api::V1::Project.all
                if projects
                    phases_and_contracts = projects.map { |project| project.to_json_with_phases_and_contracts }
                    render json: { message: 'All projects loaded successfully.', results: phases_and_contracts }
                else
                    render json: { message: 'All projects loaded successfully.', results: projects }
                end
            end
        
            def show
                render json: { message: 'Project loaded successfully.', results: @api_v1_project.to_json_with_phases_and_contracts }
            end
        
            def create
                @api_v1_project = Api::V1::Project.new api_v1_project_params
        
                if @api_v1_project.save
                    render json: { message: 'Project was successfully created.', results: @api_v1_project }
                else
                    render json: { message: 'Project was NOT successfully created.', results: @api_v1_project.errors }
                end
            end
        
            def update
                if @api_v1_project.update api_v1_project_params
                    render json: { message: 'Project was successfully updated.', results: @api_v1_project }
                else
                    render json: { message: 'Project was NOT successfully updated.', results: @api_v1_project.errors }
                end
            end
        
            def destroy
                @api_v1_project.destroy
                render json: { message: 'Project was successfully deleted.' }
            end
        
            private
        
            def set_api_v1_project
                @api_v1_project = Api::V1::Project.find params[:id]        
            end
        
            def api_v1_project_params
                params.require(:api_v1_project).permit(:name, :owner, :location, :budget, :start_date, :turnover_date, :is_done)
            end
        end
    end
end