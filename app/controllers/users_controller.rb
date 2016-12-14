class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :validate_current_user

   def custom_sign_out
     sign_out current_user
     redirect_to root_path
   end

  def show
    @user = current_user
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @user}
     end
   end

 def index
   if params[:inserted_name]
     @users = User.where(name: params[:inserted_name])
   else
     @users = User.all
   end
   respond_to do |format|
     format.html { render :show }
     format.json { render :json => @users }
   end
 end

end
