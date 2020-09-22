module Api
    module V1
        class CompaniesController < ApplicationController
            before_action :set_api_v1_company, only: [:show, :update, :destroy]
    
            def index
                companies = Api::V1::Company.all
                if companies
                    companies_with_contracts = companies.map { |company| company.to_json_with_contracts }
                    render json: { message: 'All companies loaded successfully.', results: companies_with_contracts }
                else
                    render json: { message: 'All companies loaded successfully.', results: companies }
                end
            end
        
            def show
                render json: { message: 'Company loaded successfully.', results: @api_v1_company.to_json_with_contracts }
            end
        
            def create
                api_v1_company = Api::V1::Company.new api_v1_company_params

                if api_v1_company.save
                    session[:company_id] = api_v1_company.id
                    render json: { message: 'Company was successfully created.', status: :created, logged_in: true, results: api_v1_company }
                else
                    render json: { message: 'Company was NOT successfully created.', status: 500, results: api_v1_company.errors }
                end
            end

            def update
                if @api_v1_company.update api_v1_company_params
                    render json: { message: 'Company was successfully updated.', results: @api_v1_company }
                else
                    render json: { message: 'Company was NOT successfully updated.', results: @api_v1_company.errors }
                end
            end

            def destroy
                @api_v1_company.destroy
                render json: { message: 'Company was successfully deleted.' }
            end

            private

            def set_api_v1_company
                @api_v1_company = Api::V1::Company.find params[:id]
            end
        
            def api_v1_company_params
                params.require(:api_v1_company).permit(:name, :password, :password_confirmation, :address, :phone, :established_date, :is_prime)
            end
        end
    end    
end