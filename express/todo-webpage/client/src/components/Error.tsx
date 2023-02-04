import { Card, Result, Button } from "antd"
export default function Error(): JSX.Element {
  return (
    <div>
      <Card>
        <Result
          // status 403 and status 404 have different images according to the status
          status="403"
          title="403"
          subTitle={`The page you are trying to access may not be available`}
          extra={
            <>
              <Button
                type="primary"
                onClick={() =>
                  history.push(`${ROUTE_PATHS.VIEW_PROFILE}${state.data?.realtorId}`)
                }
              >
                Check More
              </Button>
              <Button type="primary" onClick={() => history.replace(ROUTE_PATHS.DASHBOARD)}>
                Back Home
              </Button>
            </>
          }
        />
      </Card>
    </div>
  )
}
