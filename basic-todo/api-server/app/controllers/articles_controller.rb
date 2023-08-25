class ArticlesController < ApplicationController
  before_action :set_article, only: [:show, :edit, :delete]
  before_action :check_permission, only: [:edit, :delete]

  def index
    articles = Article.all.reverse.map { |article|
      # Need to find a better way to achieve this
      # Seems like a very Hacky Way
      {
        article: article,
        author: article.user.attributes.slice('id', 'email', 'username'),
        comments: PolyComment.where(commentable_id: article.id, commentable_type: Article.to_s).count
      }
    }

    render json: { articles: articles, status: :ok }
  end

  def show
    comments = PolyComment.where(commentable_id: @article.id, commentable_type: Article.to_s).map { |comment|
      {
        comment: comment,
        author: comment.user.attributes.slice('id', 'email', 'username')
      }
    }

    render json: {
      article: @article,
      author: @article.user.attributes.slice('id', 'email', 'username'),
      comments: comments,
      has_edit_rights: has_permission?,
      status: :ok
    }
  end

  def create
    @article = Article.new(title: params[:article][:title], content: params[:article][:content], user_id: @current_user.id)

    if @article.save
      render json: { status: :ok, message: 'Article saved successfully', article: @article }
    else
      render json: { status: :unprocessable_entity, message: 'There was an error saving the Article', article: nil }
    end
  end

  def edit
    if @article.update(title: params[:article][:title], content: params[:article][:content])
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
