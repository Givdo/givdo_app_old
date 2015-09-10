class DonationsController < AuthController

  def new
    @organization = Organization.find_by_id(params[:organization_id])
    @donation = Donation.new
    @donation.organization = @organization
  end
  
  def create
    donation = Donation.create(donation_params)
    values = {
      business: Paypal::BUSINESS,
      cmd: "_xclick",
      upload: 1,
      return: Paypal::APP_HOST + "/users/" + donation.user.id.to_s + "/donations/" + donation.id.to_s,
      invoice: donation.id,
      amount: donation.amount,
      item_name: get_graph().get_object(donation.organization.facebook_id)['name'],
      item_number: donation.organization['id'],
      quantity: '1' 
    }
    url = Paypal::PAYPAL_HOST + "/cgi-bin/webscr?" + values.to_query
    redirect_to(url)
  end
  
  def show
    @donation = Donation.find_by_id(params[:id])
    @organization_name = get_graph().get_object(@donation.organization.facebook_id)['name']
  end
    
  private
  def donation_params
    params.require(:donation).permit(:amount, :user_id, :organization_id)
  end
  
end