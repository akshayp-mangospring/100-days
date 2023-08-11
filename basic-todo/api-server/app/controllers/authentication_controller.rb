class AuthenticationController < ApplicationController
  skip_before_action :authenticate_request, only: [:signup, :login]

  def login
    @user = User.find_by_email(params[:user][:username])

    if @user&.authenticate(params[:user][:password])
      token = jwt_encode(user_id: @user.id)
      render json: { auth_token: token, status: :ok }
    else
      render json: { error: 'Unauthorized', status: :unauthorized }
    end
  end

  def signup
    @user = User.new(user_params)

    if @user.save
      render json: { auth_token: jwt_encode({ user_id: @user.id }), status: :ok }
    else
      render json: { error: 'Unable to create user', status: :unprocessable_entity }
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
