export default function getFormattedBuckets(buckets, bucketSize) {
  if (!buckets) {
    return null;
  }

  return buckets.map(({ sampled, count, key, transactionId }) => {
    return {
      sampled,
      transactionId,
      x0: key,
      x: key + bucketSize,
      y: count,
      style: count > 0 && sampled ? { cursor: 'pointer' } : {}
    };
  });
}
