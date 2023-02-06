
export interface INavigationBlockProps {
  setActiveDropDownDate: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveDropDownSubTask: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveDropDownMarker: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveBlockInvestment: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IMockButton { 
  name:string
  func: React.Dispatch<React.SetStateAction<boolean>>
}
