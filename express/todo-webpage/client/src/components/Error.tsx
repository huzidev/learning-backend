import { Button, Card, Result } from "antd";
import { useNavigate } from "react-router-dom";
export default function Error(): JSX.Element {

  const navigate = useNavigate();
  return (
    <div>
      <Card>
        <Result
          // status 403 and status 404 have different images according to the status
          status="404"
          title="404"
          subTitle={`The page you are trying to access may not be available`}
          extra={
            <>
              <Button
                type="primary"
                onClick={() =>
                  navigate("/")
                }
              >
                Check More
              </Button>
              <Button type="primary" onClick={() => navigate("/")}>
                Back Home
              </Button>
            </>
          }
        />
      </Card>
    </div>
  )
}
