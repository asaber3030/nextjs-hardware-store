export const ProductTypo = ({ text }: { text: string }) => {
  return (
    <div className="prose" dangerouslySetInnerHTML={{ __html: text }} />
  )
}