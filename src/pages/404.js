import React from "react"
import Layout from "../components/layout/layout"
import SeoHead from "../components/seo-head"

const NotFoundPage = () => (
  <Layout>
    <h1>404: NOT FOUND</h1>
    <br /><br />
    <h3>Page you requested does not exist</h3>
    <br /><br /><br />
  </Layout>
)

export default NotFoundPage;

export const Head = () => (
  <SeoHead
    title="404: Not found"
  />
)