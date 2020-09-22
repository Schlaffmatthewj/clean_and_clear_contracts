module Api
    module V1
        class SubContractsController < ApplicationController
            before_action :set_api_v1_sub_contract, only: [:show, :destroy]

            def index
                sub_contracts = Api::V1::SubContract.find_by api_v1_company_id: params[:company_id]
                contracts = []
                contracts.push(sub_contracts)
                if contracts.length > 0
                    contracts_with_tasks = contracts.map { |contract| contract.to_json_with_task_and_sub }
                    render json: { message: 'All sub_contracts loaded successfully.', results: contracts_with_tasks }
                else
                    render json: { message: 'All sub_contracts loaded successfully.', results: 0 }
                end
            end
        
            def show
                render json: { message: 'Sub_contract loaded successfully.', results: @api_v1_sub_contract.to_json_with_task_and_sub }
            end

            def create
                @api_v1_sub_contract = Api::V1::SubContract.new api_v1_sub_contract_params
                company_id = params[:company_id]
                task_id = params[:task_id]
                @api_v1_sub_contract[:api_v1_company_id] = company_id
                @api_v1_sub_contract[:api_v1_task_id] = task_id
        
                if @api_v1_sub_contract.save
                    render json: { message: 'Sub_contract was successfully created.', results: @api_v1_sub_contract }
                else
                    render json: { message: 'Sub_contract was NOT successfully created.', results: @api_v1_sub_contract.errors }
                end
            end
        
            def destroy
                @api_v1_sub_contract.destroy
                render json: { message: 'Sub_contract was successfully deleted.' }
            end
        
            private
        
            def set_api_v1_sub_contract
                @api_v1_sub_contract = Api::V1::SubContract.find params[:id]
            end
        
            def api_v1_sub_contract_params
                params.require(:api_v1_sub_contract).permit(:amount)
            end
        end
    end    
end