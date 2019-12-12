class UsersController < ApplicationController

  def edit
  end

  def update
    if current_user.update(user_params) #保存処理ができた場合、できなかった場合で分ける。処理が成功ならrootへ　失敗ならeditのビューへいく設定
      redirect_to root_path
    else
      render :edit
    end
  end
  
  private
  def user_params
    params.require(:user).permit(:name, :email)
  end
end