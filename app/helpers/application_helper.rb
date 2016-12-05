module ApplicationHelper
  def validate_current_user
    if params[:id] && params[:id] != current_user.id.to_s
      flash[:error]='You do not have access rights'
      redirect_to root_path
    end
  end
  def validate_current_user_graphs
    if params[:user_id] && params[:user_id] != current_user.id.to_s
      flash[:error]='You do not have access rights'
      redirect_to root_path
    end
  end
end
