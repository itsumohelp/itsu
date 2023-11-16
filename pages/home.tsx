export async function getServerSideProps (context) {
    return {
        props: {
            resolvedUrl: context.resolvedUrl,
        }
    }
}