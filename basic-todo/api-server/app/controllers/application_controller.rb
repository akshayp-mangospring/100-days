class ApplicationController < ActionController::API
  # include JsonWebToken

  before_action :authenticate_request

  SECRET_KEY = Rails.application.secret_key_base

  def jwt_encode(payload, exp = 7.days.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, SECRET_KEY)
  end

  def jwt_decode(token)
    JWT.decode(token, SECRET_KEY)
  end

  protected

  def has_permission?(inst_var)
    @current_user.id == inst_var.user_id
  end

  private

  def authenticate_request
    header = request.headers["Authorization"]
    header = header.split(" ").last if header

    unless header.present?
      render json: { error: 'Header not present', status: :unprocessable_entity }, status: :unprocessable_entity
      return
    end

    begin
      decoded = jwt_decode(header)
      @current_user = User.find(decoded.first['user_id'])
    rescue => e
      render json: { errors: e.message, status: :unprocessable_entity }, status: :unauthorized
    end
  end
end
