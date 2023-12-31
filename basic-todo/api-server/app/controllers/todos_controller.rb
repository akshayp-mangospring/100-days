class TodosController < ApplicationController
  before_action :set_todo, only: [:edit, :delete, :done]

  def index
    render json: { todos: @current_user.todos.reverse, status: :ok, user: @current_user.email }
  end

  def create
    @todo = Todo.new(content: params[:content], user_id: @current_user.id)

    if @todo.save
      render json: { status: :ok, message: 'Todo saved successfully', todo: @todo }
    else
      render json: { status: :unprocessable_entity, message: 'There was an error saving the Todo', todo: nil }
    end
  end

  def edit
    if @todo.update(content: params[:content])
      render json: { status: :ok, message: 'Todo Edited', todo: @todo }
    else
      render json: { status: :unprocessable_entity, message: 'There was an error in editing the Todo', todo: nil }
    end
  end

  def delete
    if @todo.destroy
      render json: { status: :ok, message: 'Todo Deleted', todo: nil }
    else
      render json: { status: :unprocessable_entity, message: 'There was an error in deleting the Todo', todo: nil }
    end
  end

  def done
    if @todo.update(done: params[:done])
      render json: { status: :ok, message: 'Marked Done', todo: @todo }
    else
      render json: { status: :unprocessable_entity, message: 'There was an error in marking the Todo as Done', todo: nil }
    end
  end

  def test
    render json: { message: 'Hello, World!' }
  end

  private

  def set_todo
    @todo = Todo.find_by_id(params[:id])

    if @todo.nil?
      render json: { status: :not_found, message: 'Todo Not found', todo: nil }
      return
    end
  end
end
