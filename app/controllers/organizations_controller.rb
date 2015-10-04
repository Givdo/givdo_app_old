class OrganizationsController < ApplicationController
  
  def index
    @organizations = Organization.all
  end
  
  def show
    @organization = Organization.find(params[:id])
    @organization_graph = get_graph.get_object(@organization.facebook_id)
  end
  
end