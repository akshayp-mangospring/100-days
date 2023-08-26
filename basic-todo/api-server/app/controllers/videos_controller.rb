class VideosController < ApplicationController
  before_action :set_video, only: [:show, :edit, :delete, :add_comment]
  before_action :check_permission, only: [:edit, :delete]

  def index
    videos = Video.all.reverse.map { |video|
      # Need to find a better way to achieve this
      # Seems like a very Hacky Way
      {
        video: video,
        owner: video.user.attributes.slice('id', 'email', 'username'),
        comments: PolyComment.where(commentable_id: video.id, commentable_type: Video.to_s).count
      }
    }

    render json: { videos: videos, status: :ok }
  end

  def show
    comments = PolyComment.where(commentable_id: @video.id, commentable_type: Video.to_s).map { |comment|
      {
        comment: comment,
        author: comment.user.attributes.slice('id', 'email', 'username'),
        has_edit_rights: has_permission?(comment)
      }
    }

    render json: {
      video: @video,
      owner: @video.user.attributes.slice('id', 'email', 'username'),
      comments: comments,
      has_edit_rights: has_permission?(@video),
      status: :ok
    }
  end

  def create
    @video = Video.new(title: params[:video][:title], description: params[:video][:description], url: params[:video][:url], user_id: @current_user.id)

    if @video.save
      render json: { status: :ok, message: 'Video saved successfully', video: @video }
    else
      render json: { status: :unprocessable_entity, message: 'There was an error saving the Video', video: nil }
    end
  end

  def edit
    if @video.update(title: params[:video][:title], description: params[:video][:description], url: params[:video][:url])
      render json: { status: :ok, message: 'Video Edited', video: @video }
    else
      render json: { status: :unprocessable_entity, message: 'There was an error in editing the Video', video: nil }
    end
  end

  def delete
    if @video.destroy
      render json: { status: :ok, message: 'Video Deleted', video: nil }
    else
      render json: { status: :unprocessable_entity, message: 'There was an error in deleting the Video', video: nil }
    end
  end

  def add_comment
    @comment = PolyComment.new(content: params[:content], user_id: @current_user.id, commentable: @video)

    if @comment.save
      render json: { status: :ok, message: 'Comment saved successfully', comment: {
        comment: @comment,
        author: @comment.user.attributes.slice('id', 'email', 'username'),
        has_edit_rights: true
      } }
    else
      render json: { status: :unprocessable_entity, message: 'There was an error saving the Comment', comment: nil }
    end
  end

  def edit_comment
    @comment = PolyComment.where(id: params[:comment_id]).last

    unless has_permission?(@comment)
      render json: { status: :not_found, message: 'Comment Not found', comment: nil }
      return
    end

    if @comment.update(content: params[:content])
      render json: { status: :ok, message: 'Comment Edited', comment: @comment }
    else
      render json: { status: :unprocessable_entity, message: 'There was an error in editing the Comment', comment: nil }
    end
  end

  def delete_comment
    @comment = PolyComment.where(id: params[:comment_id]).last

    unless has_permission?(@comment)
      render json: { status: :not_found, message: 'Comment Not found', comment: nil }
      return
    end

    if @comment.destroy
      render json: { status: :ok, message: 'Comment Deleted', comment: nil }
    else
      render json: { status: :unprocessable_entity, message: 'There was an error in deleting the Comment', comment: nil }
    end
  end

  private

  def set_video
    @video = Video.find_by_id(params[:id])

    if @video.nil?
      render json: { status: :not_found, message: 'Video Not found', video: nil }
      return
    end
  end

  def check_permission
    unless has_permission?(@video)
      render json: { status: :not_found, message: 'Video Not found', video: nil }
      return
    end
  end
end
