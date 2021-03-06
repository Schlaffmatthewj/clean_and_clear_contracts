class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  rescue_from ActiveRecord::RecordNotFound, :with => :record_not_found

  private
    def record_not_found(error)
      render json: { error: error.message, status: :not_found}
    end
end
