module Api
    module V1
        class SubContractsController < ApplicationController
            before_action :set_api_v1_sub_contract, only: [:destroy]

            def create
                @api_v1_sub_contract = Api::V1::SubContract.new api_v1_sub_contract_params
        
                if @api_v1_sub_contract.save
                    render json: { message: 'Sub_contract was successfully created.', 
                    results: @api_v1_sub_contract, created: true }
                else
                    render json: { message: 'Sub_contract was NOT successfully created.', 
                    results: @api_v1_sub_contract.errors.full_messages }
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
                params.require(:api_v1_sub_contract).permit(:amount, :api_v1_task_id, :api_v1_company_id)
            end
        end
    end    
end