class Api::MemesController < ApplicationController

  def create
    puts "====here===="
    file =  params[:file]
    if file
      begin
      cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true, resource_type: :auto)
      ## if successful, img saved to cloudinary, want to save to database
      # Meme.create(text: params[:text], image: cloud_image["secure_url"]) Different format
      meme = Meme.new(text: params[:text], image: cloud_image["secure_url"])  

      if meme.save 
        # ddid save to cloudinary and DB
        render json: meme
      else 
        # did save to cloudinary but not DB
        render json: {errors: meme.errors}, status: 422
      end 
      rescue => err
        # did not save to cloudinary or DB

        render json:{errors: err}, status: 422
      end
    end

  end
end
