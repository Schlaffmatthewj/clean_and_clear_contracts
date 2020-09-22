module Api
    module V1
        class PrimeContractsController < ApplicationController
            before_action :set_api_v1_prime_contract, only: [:show, :destroy]

            def index
                prime_contracts = Api::V1::PrimeContract.find_by api_v1_company_id: params[:company_id]
                contracts = []
                contracts.push(prime_contracts)
                if contracts.length > 0
                    contracts_with_projects = contracts.map { |contract| contract.to_json_with_project_and_prime }
                    render json: { message: 'All prime_contracts loaded successfully.', results: contracts_with_projects }
                else
                    render json: { message: 'All prime_contracts loaded successfully.', results: 0 }
                end
            end

            def show
                render json: { message: 'Prime_contract loaded successfully.', results: @api_v1_prime_contract.to_json_with_project_and_prime }
            end

            def create
                @api_v1_prime_contract = Api::V1::PrimeContract.new api_v1_prime_contract_params
                company_id = params[:company_id]
                project_id = params[:project_id]
                @api_v1_prime_contract[:api_v1_company_id] = company_id
                @api_v1_prime_contract[:api_v1_project_id] = project_id
        
                if @api_v1_prime_contract.save
                    render json: { message: 'Prime_contract was successfully created.', results: @api_v1_prime_contract }
                else
                    render json: { message: 'Prime_contract was NOT successfully created.', results: @api_v1_prime_contract.errors }
                end
            end
        
            def destroy
                @api_v1_prime_contract.destroy
                render json: { message: 'Prime_contract was successfully deleted.' }
            end
        
            private
        
            def set_api_v1_prime_contract
                @api_v1_prime_contract = Api::V1::PrimeContract.find params[:id]
            end
        
            def api_v1_prime_contract_params
                params.require(:api_v1_prime_contract).permit(:amount)
            end
        end
    end    
end