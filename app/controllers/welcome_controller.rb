class WelcomeController < ApplicationController
  def home
    render :home
  end

  def index
    if current_user
      redirect_to user_path(current_user)
    else
      render :index
    end
  end
end
