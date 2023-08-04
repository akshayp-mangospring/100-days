class AuthenticationController < ApplicationController
  skip_before_action :authenticate_request, only: [:signup]

  def login
    @user = User.find_by_email(params[:email])

    if @user&.authenticate(params[:password])
      token = jwt_encode(user_id: @user.id)
      render json: { token: token, status: :ok }
    else
      render json: { error: 'Unauthorized', status: :unauthorized }
    end
  end

  def signup
    @user = User.new(user_params)

    if @user.save
      render json: { user: @user, status: :ok }
    else
      render json: { error: 'Unable to create user', status: :unprocessable_entity }
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
