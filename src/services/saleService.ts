import axios from 'axios'

class SaleService {
  private resourceUrl = `https://apitest.ikbo.co/sales`

  public async getData(params: any) {
    try {
      const url = `${this.resourceUrl}?dateini=${params.startDate}&datefin=${params.endDate}&columns[]=category&columns[]=color&value=stems&columns[]=country&columns[]=customer&columns[]=variety&columns[]=provider`
      const { data } = await axios.get(url, {})
      return data
    } catch (error) {
      console.error(error)
    }
  }
}

const saleService = new SaleService()

export default saleService
