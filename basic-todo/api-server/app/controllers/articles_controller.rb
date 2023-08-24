class ArticlesController < ApplicationController
  before_action :set_article, only: [:show, :edit, :destroy]
  before_action :check_permission, only: [:edit, :destroy]

  def index
    render json: { articles: Article.all.reverse, status: :ok }
  end

  def show
    render json: { article: @article, has_edit_rights: has_permission?, status: :ok }
  end

  def create
    @article = Article.new(title: params[:title], content: params[:content], user_id: @current_user.id)

    if @article.save
      render json: { status: :ok, message: 'Article saved successfully', todo: @article }
    else
      render json: { status: :unprocessable_entity, message: 'There was an error saving the Article', article: nil }
    end
  end

  def edit
    if @article.update_all(title: params[:title], content: params[:content])
      render json: { status: :ok, message: 'Article Edited', article: @article }
    else
      render json: { status: :unprocessable_entity, message: 'There was an error in editing the Article', article: nil }
    end
  end

  def delete
    if @article.destroy
      render json: { status: :ok, message: 'Article Deleted', article: nil }
    else
      render json: { status: :unprocessable_entity, message: 'There was an error in deleting the Article', article: nil }
    end
  end

  private

  def set_article
    @article = Article.find_by_id(params[:id])

    if @article.nil?
      render json: { status: :not_found, message: 'Article Not found', article: nil }
      return
    end
  end

  def has_permission?
    @current_user.id == @article.user_id
  end

  def check_permission
    unless has_permission?
      render json: { status: :not_found, message: 'Article Not found', article: nil }
      return
    end
  end
end
