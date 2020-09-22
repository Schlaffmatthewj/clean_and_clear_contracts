module CurrentCompanyConcern
    extend ActiveSupport::Concern

    included do
        before_action :set_current_company
    end

    def set_current_company
        if session[:company_id]
            @current_company = Api::V1::Company.find session[:company_id]
        end
    end
end