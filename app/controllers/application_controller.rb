class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user! #ヘルパーメソッド　コントローラーに設定して、ログイン済ユーザーのみにアクセスを許可する
  before_action :configure_permitted_parameters, if: :devise_controller? #deviseで利用出来るパラメーターを設定する

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name]) #上記のメソッドに名前の登録を追加
  end
end
