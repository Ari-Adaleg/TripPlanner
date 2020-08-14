# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  # before_action :configure_sign_up_params, only: [:create]
  # before_action :configure_account_update_params, only: [:update]
  before_action :authenticate_user! 

  def new
    @user = User.new
    @title = "Sign up to TripPlanner"
    #list of countries
    
    # @countries = CS.get
    @countries = CS.get.map{|k,v| [v,k]}
    #list of territories -- needs country to be selected
    # @country = params[:country] 
    # @country ? @territories = CS.get(@country).values : @territories = []
    @territories = []
    @cities = []
    # @country ? @territories = CS.get(@country).map{|k,v| [v,k]} : @territories = []
    #list of cities -- needs territory to be selected
    # @territory = params[:territory]
    # @territory ? @cities = CS.get(@country, @territory) : @cities = []
  end

  def create
    @user = User.new(sign_up_params)
      if @user.save
        redirect_to root_path
      else
        render :new
      end
  end

def edit
    @title = "Update Your Info"
    @user = User.find(current_user.id)
    @countries = CS.get.map{|k,v| [v,k]}
    @territories = []
    @cities = []
end

def update
    @user = User.find(current_user.id)

    if @user.update_attributes(sign_up_params)
        redirect_to root_url
    else
        render :edit
    end
end

def destroy
    @user = User.find(current_user.id)
    @user.destroy
    redirect_to root_url
end


  # GET /resource/sign_up
  # def new
  #   super
  # end

  # POST /resource
  # def create
  #   super
  # end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  # def update
  #   super
  # end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_up_params
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [:attribute])
  # end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_account_update_params
  #   devise_parameter_sanitizer.permit(:account_update, keys: [:attribute])
  # end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end
  private

  def sign_up_params 
    params.require(:user).permit(:first_name, :last_name, 
      :username, :city, :province, :country, :email, :password, :password_confirmation)
  end
end
