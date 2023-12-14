
interface GlobalContextProps {
  loading: boolean
  status: boolean
  levels: Array<Level>
  userLevel: number
  isShopkeeper: boolean
  profits: Array<Profits>
  user: User | undefined
  summary: Summary | undefined
  minProfits:number
  maxProfits:number
}