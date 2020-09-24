module Api
    module V1
        class PrimeContractsController < ApplicationController
            before_action :set_api_v1_prime_contract, only: [:destroy]

            def create
                @api_v1_prime_contract = Api::V1::PrimeContract.new api_v1_prime_contract_params
        
                if @api_v1_prime_contract.save
                    render json: { message: 'Prime_contract was successfully created.', 
                    results: @api_v1_prime_contract }
                else
                    render json: { message: 'Prime_contract was NOT successfully created.', 
                    results: @api_v1_prime_contract.errors }
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