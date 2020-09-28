module Api
    module V1
        class SessionsController < ApplicationController
            include CurrentCompanyConcern

            def create
                company = Api::V1::Company.find_by(name: params["api_v1_company"]["name"])
                    .try(:authenticate, params["api_v1_company"]["password"])

                if company
                    session[:company_id] = company.id
                    render json: {
                        status: :created,
                        logged_in: true,
                        company: company
                    }
                else
                    render json: { status: 401 }
                end
            end

            def logged_in
                if @current_company
                    render json: {
                        logged_in: true,
                        company: @current_company
                    }
                else
                    render json: { logged_in: false }
                end
            end

            def logout
                reset_session
                render json: { status: 200, logged_out: true }
            end
        end 
    end
end