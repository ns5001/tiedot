class UsersController < ApplicationController

 def new
 end

 def custom_sign_out
   sign_out current_user
   redirect_to root_path
 end

 def create

 end

 def show
   @user = User.find(params[:id])
   respond_to do |format|
     format.html { render :show }
     format.json { render json: @user}
   end
 end

 def update
 end

 def index
   if params[:inserted_name]
     @users = User.where(name: params[:inserted_name])
    #  if @users.include?(current_user)
    #    @users.delete(current_user)
    #  end
   else
     @users = User.all
   end
   respond_to do |format|
     format.html { render :show }
     format.json { render :json => {:found_user => @users, :current_user => current_user.to_json}}
   end
 end

end
