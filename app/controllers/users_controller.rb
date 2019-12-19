class UsersController < ApplicationController

  def edit
  end

  def update
    if current_user.update(user_params) #保存処理ができた場合、できなかった場合で分ける。処理が成功ならrootへ失敗ならeditのビューへいく設定
      redirect_to root_path
    else
      render :edit
    end
  end

  def index
    return nil if params[:keyword] == ""
    @users = User.where(['name LIKE ?', "%#{params[:keyword]}%"] ).where.not(id: current_user.id).limit(10)
    respond_to do |format|
      format.html
      format.json
    end
  end
  
  private
  def user_params
    params.require(:user).permit(:name, :email)
  end
end