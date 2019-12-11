Rails.application.routes.draw do
  devise_for :users
root to:"messages#index"  
resources :users, only: [:edit, :update] #ユーザー編集の為のルート設定
end
