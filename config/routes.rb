Rails.application.routes.draw do
  devise_for :users
  root to:"groups#index"  
  resources :users, only: [:index, :edit, :update]#edit updateユーザー編集の為のルート設定
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
  end
end


