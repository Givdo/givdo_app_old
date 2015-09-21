class DonationsController < AuthController

  def new
    @organization = Organization.find_by_id(params[:organization_id])
    @donation = Donation.new
    @donation.organization = @organization
    @donation.user = current_user
  end
  
  def create

    # Check that the user ID isn't being spoofed in the donation params.
    user_id = donation_params['user_id'].to_i
    if user_id != current_user.id
      raise "Wrong user ID in donation."
    end

    donation = Donation.create(donation_params)
    donation_url = self.request.base_url + donation_path(donation)

    logger.debug donation.to_s
    
    if Rails.env.production?
      # Real donation is only created in production mode by redirecting to Paypal.
      values = {
        business: Paypal::BUSINESS,
        cmd: "_xclick",
        upload: 1,
        return: donation_url,
        invoice: donation.id,
        amount: donation.amount,
        item_name: get_graph().get_object(donation.organization.facebook_id)['name'],
        item_number: donation.organization['id'],
        quantity: '1'
      }
      paypal_url = Paypal::PAYPAL_HOST + "/cgi-bin/webscr?" + values.to_query
      redirect_to(paypal_url)
    else
      redirect_to(donation_url)
    end
  end
  
  def show
    @donation = Donation.find_by_id(params[:id])
    if current_user.id != @donation.user.id
      # Error if trying to view someone else's donation.
      raise "Not authorized to view this page."
    end
    @organization = @donation.organization
    @organization_graph = get_graph().get_object(@donation.organization.facebook_id)
  end
  
  def index
    @donations = Donation.where(user_id: current_user.id)
  end
    
  private
  def donation_params
    params.require(:donation).permit(:user_id, :amount, :organization_id)
  end
  
end