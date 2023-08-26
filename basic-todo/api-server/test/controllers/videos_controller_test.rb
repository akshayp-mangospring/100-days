require "test_helper"

class VideosControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get videos_index_url
    assert_response :success
  end

  test "should get show" do
    get videos_show_url
    assert_response :success
  end

  test "should get create" do
    get videos_create_url
    assert_response :success
  end

  test "should get delete" do
    get videos_delete_url
    assert_response :success
  end

  test "should get edit" do
    get videos_edit_url
    assert_response :success
  end
end
