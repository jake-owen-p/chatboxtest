import { PropsWithChildren } from 'react'

export const PageContainer = ({ children }: PropsWithChildren) => {
  return <div className="flex flex-col px-[8%] py-3">{children}</div>
}
